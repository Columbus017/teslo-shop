'use server';

import { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userID: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userID);

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo grabar la direccion'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userID: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userID }
    });

    const addressToSave = {
      userID,
      address: address.address,
      address2: address.address2,
      countryID: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city
    }

    if ( !storeAddress ) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userID },
      data: addressToSave
    });

    return updatedAddress;

  } catch (error) {
    console.log(error);
    throw new Error('No se pudo grabar la direccion');
  }
}