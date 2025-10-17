import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { prisma } from 'src/prisma.client';
import { CategoryType } from 'generated/prisma';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return this.getClient().category.create({
      data: createCategoryDto,
    })
  }

  findAll(categoryType?: CategoryType) {
    const where = categoryType ? { categoryType } : {};
    
    return this.getClient().category.findMany({
      where,
    });
  }

  findOne(id: number) {
    return this.getClient().category.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.getClient().category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.getClient().category.delete({
      where: { id },
    });
  }

  getClient() {
    return prisma;
  }
}
