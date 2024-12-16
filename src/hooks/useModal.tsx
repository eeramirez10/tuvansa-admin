import { useContext, useEffect } from 'react'
import { ModalContext } from 'src/context/Modal'
import { useAppDispatch, useAppSelector } from './useStore'
import { selectPayment } from 'src/store/payments/slice'

interface Props {
  open: boolean
  showModal: ({ id }: { id: string }) => void
  handleOk: () => void
  handleCancel: () => void
}

export const useModal = (): Props => {
  const context = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const payments = useAppSelector(selector => selector.payments.data)
  if (context === undefined) {
    throw new Error('UseModal must be used in provider')
  }

  const { open, setOpen } = context

  const showModal = ({ id }: { id: string }): void => {
    const payment = payments.find(p => p.id === id)
    if (payment !== undefined) {
      dispatch(selectPayment(payment))
    }
    setOpen(true)
  }

  const handleOk = (): void => {
    setOpen(false)
  }

  const handleCancel = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      dispatch(selectPayment(null))
    }
  }, [open])

  return {
    open,
    showModal,
    handleOk,
    handleCancel
  }
}
