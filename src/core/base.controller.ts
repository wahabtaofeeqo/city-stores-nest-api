export class BaseController {
    
    okResponse(message: string, data?: any) {
        return {
            status: true,
            message,
            data
        }
    }

    errResponse(message: any, error?: any) {
        return {
            status: false,
            message,
            error
        }
    }
    
    paginateRes(message: any, paginator: any) {
        return {
            status: false,
            message,
            data: paginator.data,
            meta: paginator.meta
        }
    }
}