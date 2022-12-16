/* eslint-disable @typescript-eslint/ban-types */
import {
    Injectable,
    BadGatewayException,
    NotFoundException,
  } from '@nestjs/common';
import { IBaseService } from 'src/interfaces/base-service.interface';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class BaseService<T> implements IBaseService<T> {
    constructor(public repository: Repository<any>) {}
    
    /**
     * Finds a model
     *
     * @returns
     */
    async get(id: any, relations = {}): Promise<T> {
      return await this.repository
        .findOne({where: {id}, relations: relations});
    }

    /**
     * Finds a model
     *
     * @returns
     */
    async getAll(clause = {}, relations = {}): Promise<T[]> {
      return await this.repository.find({
        where: clause
      });
    }
  
    /**
     * Creates a new model
     *
     * @param entity
     * @returns
     */
    create(entity: any): Promise<T> {
      return this.repository.save(entity);
    }
  
    /**
     * Deletes a model with ID
     *
     * @param id
     * @returns
     */
    delete(id: string) {
      return this.repository.delete(id);
    }
  
    /**
     * Deletes a models
     *
     * @param clause
     * @returns
     */
     deleteBy(clause: any) {
      return this.repository.delete(clause);
    }
  
    /**
     * Updates a model
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id: string, entity: T): Promise<T> {
      try {
        const model: Object = await this.findOne({ id });
  
        if (model == null) throw new NotFoundException('Model does not exist');
  
        const mergeEntity: any = Object.assign(model, entity);
        const response: T = await this.repository.save(mergeEntity);
        return response;
      } catch (error) {
        throw new BadGatewayException(error);
      }
    }
  
    /**
     * Finds a model
     *
     * @param clause
     * @returns
     */
    findOne(clause: any, relations = {}): Promise<T> {
      return this.repository.findOne({
        where: clause,
        relations: relations
      });
    }
  
    /**
     * Finds a model
     *
     * @param clause
     * @returns
     */
     findOneOrFail(clause: any, relations = {}): Promise<T> {
      return this.repository.findOneOrFail({
        where: clause,
        relations: relations
      });
    }
  
    /**
     * 
     * @param clause
     */
    async findOrFail(clause: any): Promise<T> {
      const model = await this.repository.findOneBy(clause);
      if(!model) {
        throw new NotFoundException('Model not found');
      }
      return model;
    }
  
   
    /**
     * 
     * @param clause 
     * @param options 
     * @param relations 
     * @returns 
     */
    async paginate(clause = {}, options: any = {}, relations = {}) {
  
      //
      const page = options.page || 1;
      const limit = options.limit || 10;
      const offset = (page == 1) ? 0 : page * limit;
  
      // Count Models
      const total = await this.repository.countBy(clause)
  
      // Get Models
      const data = await this.repository.find({
        where: clause,
        skip: offset,
        relations: relations,
        take: limit,
      });
  
      //
      return {
        data,
        meta: {
          limit, total,
          current_page: page,
          last_page: Math.ceil(total / limit)
        }
      }
    }
  }
  