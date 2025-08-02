"use server";

import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { CategorySchema } from "../types/CategorySchema";

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => db.category.delete({ where: { id } }), //Prisma method to delete a record from the category table where the id matches the one passed.
  });
};

const getCategories = async () => {
  return await db.category.findMany(); //calls the Prisma Client method to query all records from the category table in the database. This is analogous to the SQL query: SELECT * FROM category;
};

const getCategory = async (id: number): Promise<CategorySchema> => {
  const res = await db.category.findFirst({
    where: { id },
  });

  return {
    ...res,
    action: "update",
    name: res?.name ?? "",
    id,
  };
};

export {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
