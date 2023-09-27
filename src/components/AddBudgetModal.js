import { useRef } from "react"
import { Form, FormControl, FormGroup, FormLabel, Modal, ModalHeader, ModalBody, ModalTitle, Button } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"


export default function AddBudgetModal({ show, handleClose }){
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()
    function handleSubmit(e){
        e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        })
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} >
            <ModalHeader closeButton>
                <ModalTitle>New Budget</ModalTitle>      
              </ModalHeader>
              <ModalBody>
                  <FormGroup className="mb-3" controlId="name">
                      <FormLabel>Name</FormLabel>
                      <FormControl ref={nameRef} type="text" required />
                  </FormGroup>
                  <FormGroup className="mb-3" controlId="max">
                      <FormLabel>Maximum Spending</FormLabel>
                      <FormControl ref={maxRef} type="number" required min={0} step={0.01} />
                  </FormGroup>
                  <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">Add</Button>
                  </div>
              </ModalBody>
        </Form>
    </Modal>
  )
}
