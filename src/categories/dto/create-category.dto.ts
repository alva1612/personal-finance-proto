import { CategoryType } from "generated/prisma";

export class CategoryModel {
    id?: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    categoryType: CategoryType;
    parentId?: number;

    constructor(partial: Partial<CategoryModel>) {
        Object.assign(this, partial);
    }
}

export class CreateCategoryDto extends CategoryModel {

    constructor(partial: Partial<CreateCategoryDto>) {
        super(partial);
    }
}
