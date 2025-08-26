'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userID: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userID }
    })

    if ( !address ) return null;

    const { countryID, address2, ...rest } = address;

    return {
      ...rest,
      country: countryID,
      address2: address2 ? address2 : ''
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}