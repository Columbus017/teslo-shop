'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userID: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userID }
    });

    return {
      ok: true,
      message: 'Direccion eliminada correctamente'
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }
  }
}