import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { waterIntakeValidationSchema } from 'validationSchema/water-intakes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.water_intake
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWaterIntakeById();
    case 'PUT':
      return updateWaterIntakeById();
    case 'DELETE':
      return deleteWaterIntakeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWaterIntakeById() {
    const data = await prisma.water_intake.findFirst(convertQueryToPrismaUtil(req.query, 'water_intake'));
    return res.status(200).json(data);
  }

  async function updateWaterIntakeById() {
    await waterIntakeValidationSchema.validate(req.body);
    const data = await prisma.water_intake.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWaterIntakeById() {
    const data = await prisma.water_intake.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
