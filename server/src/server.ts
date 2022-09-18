import  express, { request, response } from "express";
import   cors  from "cors";
import { Prisma, PrismaClient } from '@prisma/client'
import { convertHourStringToMinute } from './utils/convert-hour-to-minutes'
import { convertMinutesToHoursString } from "./utils/convert-minutes-to hours";

const app = express()

app.use(express.json())
const prisma = new PrismaClient({
  // log: ['query']x
})

app.use(cors())

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })


  return response.status(200).json(games)
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const body: any = request.body

 
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinute(body.hourStart),
      hourEnd: convertHourStringToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(200).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      useVoiceChannel: true,
      yearsPlaying: true, 
      hourStart: true,
      hourEnd: true,
      weekDays: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createAt: 'desc'
    }
  })


  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord,
  })
})

app.listen(3333)