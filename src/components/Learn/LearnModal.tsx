// src/components/Learn/LearnModal.tsx
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function LearnModal({ open, onClose, title, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" aria-labelledby="learn-dialog-title">
      <DialogTitle id="learn-dialog-title" sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
