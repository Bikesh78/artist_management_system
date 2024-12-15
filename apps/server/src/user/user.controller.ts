import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getPaginatedUsers(@Query() pageOptionsDto: PageOptionsDto) {
    return this.userService.getPaginatedUsers(pageOptionsDto);
  }

  @Get(":id")
  findUserById(@Param("id") id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
