export const crudServiceStubWithExceptions = `/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, #{Model} } from '@prisma/client';
import {
  PaginationInterface,
  PrismaService,
} from '@prisma-utils/nestjs-prisma';

@Injectable()
export class #{CrudServiceClassName} {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.#{Model}FindManyArgs,
  ): Promise<PaginationInterface<#{Model}>> {
    const [items, count] = await this.prismaService.$transaction([
      this.prismaService.#{moDel}.findMany(filter),
      this.prismaService.#{moDel}.count({ where: filter?.where }),
    ]);

    const take = filter?.take ? filter?.take : count;
    const skip = filter?.skip ? filter?.skip : 0;

    return {
      items: items,
      meta: {
        totalItems: count,
        items: items.length,
        totalPages: Math.ceil(count / take),
        page: skip / take + 1,
      },
    };
  }

  async getById(id: string): Promise<#{Model}> {
    try {
      const result = await this.prismaService.#{moDel}.findUniqueOrThrow({
        where: { id: id }
      });
      return result;
    } catch(e) {
      throw new NotFoundException(\`#{Model} Resource \${id} was not found.\`);
    }
  }

  async create(data: Prisma.#{Model}CreateInput): Promise<#{Model}> {
    try {
      const result = await this.prismaService.#{moDel}.create({ data: data });
      return result;
    } catch (e) {
      throw new InternalServerErrorException(\`Could not create #{Model} Resource\`);
    }
  }

  async update(
    id: string,
    data: Prisma.#{Model}UpdateInput,
  ): Promise<#{Model}> {
    try {
      return await this.prismaService.#{moDel}.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        \`Could not update #{Model} Resource \${id}\`,
      );
    }
  }

  async delete(id: string): Promise<#{Model}> {
    try {
      return await this.prismaService.#{moDel}.delete({ where: { id: id } });
    } catch (e) {
      throw new InternalServerErrorException(
        \`Could not delete #{Model} Model \${id}\`,
      );
    }
  }
}
`;

export const crudServiceStub = `/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { Injectable } from '@nestjs/common';
import { Prisma, #{Model} } from '@prisma/client';
import {
  PaginationInterface,
  PrismaService,
} from '@prisma-utils/nestjs-prisma';

@Injectable()
export class #{CrudServiceClassName} {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.#{Model}FindManyArgs,
  ): Promise<PaginationInterface<#{Model}>> {
    const [items, count] = await this.prismaService.$transaction([
      this.prismaService.#{moDel}.findMany(filter),
      this.prismaService.#{moDel}.count({ where: filter?.where }),
    ]);

    const take = filter?.take ? filter?.take : count;
    const skip = filter?.skip ? filter?.skip : 0;

    return {
      items: items,
      meta: {
        totalItems: count,
        items: items.length,
        totalPages: Math.ceil(count / take),
        page: skip / take + 1,
      },
    };
  }

  async getById(id: string): Promise<#{Model}> {
    const result = await this.prismaService.#{moDel}.findUniqueOrThrow({
      where: { id: id }
    });
    return result;
  }

  async create(data: Prisma.#{Model}CreateInput): Promise<#{Model}> {
    const result = await this.prismaService.#{moDel}.create({ data: data });
    return result;
  }

  async update(
    id: string,
    data: Prisma.#{Model}UpdateInput,
  ): Promise<#{Model}> {
    return await this.prismaService.#{moDel}.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string): Promise<#{Model}> {
    return await this.prismaService.#{moDel}.delete({ where: { id: id } });
  }
}
`;
