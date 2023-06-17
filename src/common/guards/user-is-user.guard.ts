import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const user = request.user;
    return this.userService
      .findOne({ where: { id: user.sub } })
      .then((user) => (user && user.id === params.id) || false);
  }
}
