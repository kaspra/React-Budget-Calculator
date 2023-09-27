import { Container,Stack,Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import {useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import './Style.css';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setshowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId){
    setshowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <div direction="horizontal" gap="2" className="mb-4 nav-bar">
          <h1 className="text-primary logo" style={{ fontFamily: 'Roboto' }}>Budget</h1>
          <div className="nav-btn">
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
          </div>
        </div>
        {/* <div className="mb-4 d-flex flex-column flex-md-row flex-lg-row cen-text">
          <h1 className="me-auto sm-mx-auto text-primary" style={{ fontFamily: 'Roboto' }}>Budget</h1>
          <div className="d-flex flex-column flex-md-row custome-gap" gap="2">
            <Button variant="primary" className="btn-nav" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" className="btn-nav" onClick={openAddExpenseModal}>Add Expense</Button>
          </div>
        </div> */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total+expense.amount,0
            )
            return (
              <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)} 
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}   
            />
            )
          })}
           <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal} 
            onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setshowAddExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()} />
    </>
  );
}

export default App;