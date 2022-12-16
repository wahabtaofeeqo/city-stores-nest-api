import { City } from "src/modules/city/entities/city.entity";
import { Store } from "src/modules/store/entities/store.entity";
import { PasswordReset } from "src/modules/user/entities/password-reset.entity";
import { User } from "src/modules/user/entities/user.entity";

export const entities = [
  User, City, Store, PasswordReset
];
