import React from 'react'
import { View } from 'react-native'
import { DuoInfo } from '../DuoInfo'

import { styles } from './styles'

export interface DuoCardProps {
  id: string
  name: string
  hourStart: string
  hourEnd: string
  yearsPlaying: number
  useVoiceChannel: boolean
  weekDays: string[]
}

interface Props {
  data: DuoCardProps
}

export function DuoCard({ data }: Props) {
  // console.log(data)
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo label="Disponibilidade" value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
      <DuoInfo label="Nome" value="Gustavo Mendonça" colorValue="#4257" />
    </View>
  )
}
