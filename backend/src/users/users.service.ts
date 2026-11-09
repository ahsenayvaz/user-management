import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onModuleInit() {
    if ((await this.repo.count()) > 0) return;
    await this.create({ username: 'admin', password: 'admin123', fullName: 'Admin', role: 'admin' });
    await this.create({ username: 'user', password: 'user123', fullName: 'Kullanıcı', role: 'user' });
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    return user;
  }

  findByUsername(username: string) {
    return this.repo.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'fullName', 'role'],
    });
  }

  async create(dto: CreateUserDto) {
    if (await this.repo.findOneBy({ username: dto.username })) {
      throw new ConflictException('Bu kullanıcı adı zaten kullanılıyor');
    }
    const user = await this.repo.save({ ...dto, password: await bcrypt.hash(dto.password, 10) });
    return this.findOne(user.id);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.username && dto.username !== user.username) {
      if (await this.repo.findOneBy({ username: dto.username })) {
        throw new ConflictException('Bu kullanıcı adı zaten kullanılıyor');
      }
      user.username = dto.username;
    }
    if (dto.fullName) user.fullName = dto.fullName;
    if (dto.role) user.role = dto.role;
    if (dto.password) user.password = await bcrypt.hash(dto.password, 10);

    await this.repo.save(user);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
  }
}
