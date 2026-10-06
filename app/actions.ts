"use server";

import { prisma } from "@/lib/prisma";

export async function getMapServices() {
  return await prisma.serviceRequest.findMany({
    where: { status: "PUBLISHED" },
    include: { client: true },
  });
}
