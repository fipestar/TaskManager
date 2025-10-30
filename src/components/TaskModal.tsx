import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useTask } from '../hooks/useTask'
import DetailForm from './TaskForm'

export default function TaskModal() {
  const { state, dispatch } = useTask()

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex items-center justify-center">
        <button
          type="button"
          onClick={() => dispatch({ type: 'show-modal' })}
          className="group relative"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <PlusCircleIcon className='relative w-16 h-16 md:w-20 md:h-20 text-blue-600 rounded-full hover:text-blue-700 hover:scale-110 transition-all duration-200 drop-shadow-2xl' />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => dispatch({ type: 'close-modal' })}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white p-8 md:p-10 text-left align-middle shadow-2xl transition-all">
                   <DetailForm />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
