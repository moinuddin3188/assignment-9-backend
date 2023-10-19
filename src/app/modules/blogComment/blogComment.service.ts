import { BlogComment } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertInToDB = async (data: BlogComment): Promise<BlogComment> => {

  const result = await prisma.blogComment.create({data})

  if(!result){
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Blog Comment")
  }

  return result
}

const getSingleFromDB = async (id: string): Promise<BlogComment | null> => {
  const result = await prisma.blogComment.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const getAllFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<BlogComment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.blogComment.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.blogComment.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateInToDB = async (
  id: string,
  data: Partial<BlogComment>
): Promise<BlogComment> => {
  const isExist = await prisma.blogComment.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog Comment doesn't Exist");
  }

  const result = await prisma.blogComment.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<BlogComment> => {
  const isExist = await prisma.blogComment.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog Comment doesn't Exist");
  }

  const result = await prisma.blogComment.delete({ where: { id } });

  return result;
};

export const BlogCommentService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
