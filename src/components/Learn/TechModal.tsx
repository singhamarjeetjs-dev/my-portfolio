// src/components/Learn/TechModal.tsx
import { useState, Suspense } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { TECHS } from '../../data/learnData'
import DemoLoader from './DemoLoader'

type Props = {
  open: boolean
  onClose: () => void
  techId?: string
}

export default function TechModal({ open, onClose, techId }: Props) {
  const [mode, setMode] = useState<'topics' | 'demo'>('topics')
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null)

  const tech = TECHS.find(t => t.id === techId)

  const openDemo = (id: string) => {
    setActiveDemoId(id)
    setMode('demo')
  }

  const backToTopics = () => {
    setMode('topics')
    setActiveDemoId(null)
  }

  if (!tech) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      aria-labelledby="learn-modal"
      scroll="paper"
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        {mode === 'demo' ? (
          <IconButton aria-label="Back" onClick={backToTopics}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {tech.title}
        </Typography>

        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ p: 3 }}>
        {mode === 'topics' && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-start',
            }}
          >
            {tech.topics.map(topic => (
              <Card
                key={topic.id}
                elevation={2}
                sx={{
                  width: { xs: '100%', sm: '48%', md: '31%' },
                  flexGrow: 1,
                  flexBasis: { xs: '100%', sm: '48%', md: '31%' },
                }}
              >
                <CardActionArea onClick={() => openDemo(topic.id)}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {topic.title}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                      {topic.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}

        {/* Demo View */}
        {mode === 'demo' && activeDemoId && (
          <Suspense fallback={<Typography>Loading demo…</Typography>}>
            <DemoLoader techId={tech.id} demoId={activeDemoId} />
          </Suspense>
        )}
      </Box>
    </Dialog>
  )
}
