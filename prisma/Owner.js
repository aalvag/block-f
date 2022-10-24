import prisma from "./prisma";

export const getOwners = async () => {
  return prisma.ower.findMany({
    orderBy: {
      batch: "asc",
    },
  });
};

export const getOwner = async (id) => {
  return prisma.ower.findUnique({
    where: {
      id,
    },
  });
};

export const createOwner = async (data) => {
  return prisma.ower.create({
    data,
  });
};

export const updateOwner = async (id, data) => {
  return prisma.ower.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteOwner = async (id) => {
  return prisma.ower.delete({
    where: {
      id,
    },
  });
};
