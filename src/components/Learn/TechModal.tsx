// src/components/Learn/TechModal.tsx
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { TECHS, type Tech } from '../../data/learnData'
import DemoLoader from './DemoLoader'

// helper icon imports
import CodeIcon from '@mui/icons-material/Code'
import BoltIcon from '@mui/icons-material/Bolt'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import BugReportIcon from '@mui/icons-material/BugReport'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'

type Props = {
  open: boolean
  onClose: () => void
  techId?: string
}

/** Pick an icon component based on topic metadata (fallbacks included) */
function TopicIcon({ iconKey }: { iconKey?: string }) {
  switch (iconKey) {
    case 'code': return <CodeIcon />
    case 'perf': return <BoltIcon />
    case 'memory': return <MemoryIcon />
    case 'storage': return <StorageIcon />
    case 'bug': return <BugReportIcon />
    case 'network': return <DeviceHubIcon />
    default: return <CodeIcon />
  }
}

export default function TechModal({ open, onClose, techId }: Props) {
  const [mode, setMode] = useState<'topics' | 'demo'>('topics')
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  const tech: Tech | undefined = TECHS.find(t => t.id === techId)

  // Reset modal state when tech changes or closed
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode('topics')
      setActiveDemoId(null)
      setQuery('')
    }
  }, [open, techId])

  if (!tech) return null

  const topics = tech.topics

  // filter topics by search query (title + description + tags)
  const q = query.trim().toLowerCase()
  const filtered = q
    ? topics.filter(t => {
        if (t.title.toLowerCase().includes(q)) return true
        if ((t.description || '').toLowerCase().includes(q)) return true
        if (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q))) return true
        return false
      })
    : topics

  const openDemo = (id: string) => {
    setActiveDemoId(id)
    setMode('demo')
  }

  const backToTopics = () => {
    setMode('topics')
    setActiveDemoId(null)
  }

  // responsive card width computed for flexbox layout
  const cardWidth = isSm ? '100%' : isMd ? '48%' : '31%'

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

      <Divider />

      {/* Search + meta */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder={`Search ${tech.title} topics...`}
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200, flex: '1 1 320px' }}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {filtered.length} topics
          </Typography>
          {filtered.length !== topics.length && (
            <Typography variant="body2" color="text.secondary">filtered</Typography>
          )}
        </Stack>

        <Box sx={{ flex: 1 }} />

        {/* optional: show tags summary */}
        <Stack direction="row" spacing={1}>
          {(tech.topTags || []).slice(0, 5).map(tag => (
            <Tooltip key={tag} title={tag}>
              <Chip size="small" label={tag} />
            </Tooltip>
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Body */}
      <Box sx={{ p: 3 }}>
        {/* Topics flexbox grid */}
        {mode === 'topics' && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-start',
            }}
          >
            {filtered.map(topic => (
              <Card
                key={topic.id}
                elevation={2}
                sx={{
                  width: cardWidth,
                  flexGrow: 1,
                  flexBasis: cardWidth,
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                  transition: 'transform .18s ease, box-shadow .18s ease'
                }}
              >
                <CardActionArea onClick={() => openDemo(topic.id)}>
                  <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', borderRadius: 1 }}>
                      <TopicIcon iconKey={topic.icon} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{topic.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{topic.description}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {topic.difficulty && <Chip label={topic.difficulty} size="small" variant="outlined" />}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}

        {/* Demo view */}
        {mode === 'demo' && activeDemoId && (
          <Box sx={{ mt: 2 }}>
            <DemoLoader techId={tech.id} demoId={activeDemoId} />
          </Box>
        )}
      </Box>
    </Dialog>
  )
}
