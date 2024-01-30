import { type Payment } from 'src/interfaces/Payment'
import { useAppSelector } from './useStore'
import { getDoctoById } from 'src/services/docto'
import { loadDoctos, selectDocto } from 'src/store/doctos/slice'
import { useDispatch } from 'react-redux'
import { getAllDoctos } from '../services/docto'

interface Props {
  doctos: Payment[]
  docto: Payment | null
  getById: ({ id }: { id: string }) => Promise<void>
  getAll: () => Promise<void>
}

export const useDoctos = (): Props => {
  const doctos = useAppSelector(state => state.doctos.data)
  const docto = useAppSelector(state => state.doctos.selected)
  const dispatch = useDispatch()

  const getAll = async (): Promise<void> => {
    const resp = await getAllDoctos()

    if (resp.error !== undefined) {
      console.log(resp.error)
      dispatch(loadDoctos([]))
      return
    }
    console.log(resp)
    dispatch(loadDoctos(resp.doctos !== undefined ? resp?.doctos : []))
  }

  const getById = async ({ id }: { id: string }): Promise<void> => {
    const { docto } = await getDoctoById({ id })

    dispatch(selectDocto(docto ?? null))
  }

  return {
    doctos,
    docto,
    getById,
    getAll
  }
}
