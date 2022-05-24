const { PrismaClient } = require('@prisma/client');

let global = {};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

exports.default = prisma;
