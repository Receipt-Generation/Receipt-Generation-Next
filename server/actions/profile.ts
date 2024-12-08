'use server'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function getOrganisation(orgEmail: string){
    const org = await prisma.organisation.findFirst({
        where: {
            orgEmail: orgEmail
        },
    })
    return org
    
}


export async function removeStripeId(orgId: string){
    const org = await prisma.organisation.update({
        where: {
            oid: orgId
        },
        data: {
            StripeId: null
        }
    })
    return org
}