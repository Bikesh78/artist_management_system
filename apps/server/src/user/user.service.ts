import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getPaginatedUsers(pageOptionsDto: PageOptionsDto) {
    return await this.userRepository.getPaginatedUsers(pageOptionsDto);
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async createUser(body: CreateUserDto) {
    const { password, confirm_password } = body;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    body.password = passwordHash;
    return await this.userRepository.createUser(body);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return await this.userRepository.deleteUser(id);
  }
}
