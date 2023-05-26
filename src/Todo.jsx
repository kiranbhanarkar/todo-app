import React, { useState } from 'react'
import { ToggleButton } from 'react-bootstrap';
import ExcelJS from 'exceljs';

function Todo() {
    const [checked, setChecked] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todos2, setTodos2] = useState([]);
    console.log(todos , todos2);
    
    const handleExport = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        worksheet.columns = Object.keys(todos[0]).map((key) => ({
          header: key,
          key: key,
        }));
        todos.forEach((row) => {
          worksheet.addRow(row);
        });
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'List1data.xlsx');
          link.click();
        });
      };

      const handleExport2 = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        worksheet.columns = Object.keys(todos2[0]).map((key) => ({
          header: key,
          key: key,
        }));
        todos2.forEach((row) => {
          worksheet.addRow(row);
        });
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'List2Data.xlsx');
          link.click();
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!checked) {
            const newTodo2 = event.target.elements.todo.value;
            const updatedTodos2 = [...todos2, { text2: newTodo2,  editing2: false }];
            setTodos2(updatedTodos2);
            event.target.elements.todo.value = "";
        } else {
            const newTodo = event.target.elements.todo.value;
            const updatedTodos = [...todos, { text: newTodo,  editing: false }];
            setTodos(updatedTodos);
            event.target.elements.todo.value = "";
        }
    }

    const handleDelete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }

    const handleEdit = (index, event) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = event.target.value;
        setTodos(updatedTodos);
    }

    const handleEditButtonClick = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].editing = !updatedTodos[index].editing;
        setTodos(updatedTodos);
    }

    const handleDelete2 = (index) => {
        const updatedTodos2 = [...todos2];
        updatedTodos2.splice(index, 1);
        setTodos2(updatedTodos2);
    }

    const handleEdit2 = (index, event) => {
        const updatedTodos2 = [...todos2];
        updatedTodos2[index].text2 = event.target.value;
        setTodos2(updatedTodos2);
    }

    const handleEditButtonClick2 = (index) => {
        const updatedTodos2 = [...todos2];
        updatedTodos2[index].editing2 = !updatedTodos2[index].editing2;
        setTodos2(updatedTodos2);
    }

    const handleMoveToList1 = (index) => {
        const elementToCopy = todos2[index];
        console.log(elementToCopy);
        const updatedTodos = [...todos, {text: elementToCopy.text2}];
        setTodos(updatedTodos);

        const updatedTodos2 = [...todos2];
        updatedTodos2.splice(index, 1);
        setTodos2(updatedTodos2);
    }

    const handleMoveToList2 = (index) => {
        const elementToCopy = todos[index];
        console.log(elementToCopy);
        const updatedTodos2 = [...todos2, {text2: elementToCopy.text}];
        setTodos2(updatedTodos2);

        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }
  
    return (
        <div className='container' style={{height:'100vh'}}>
            <h1 className='display-2 text-center'>To-do List</h1>
            <form className='d-flex mb-4' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter To-do text' name='todo' className='input form-control w-75' />
                <ToggleButton
                        className="btn w-15 m-auto"
                        id="toggle-check"
                        type="checkbox"
                        variant={checked ? 'outline-secondary' : 'success'}
                        checked={checked}
                        value="1"
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                    >
                        {checked? 'List 1' : 'List 2'}
                </ToggleButton>

                <button type='submit' className='btn btn-primary w-25'>Add Todo</button>
            </form>
            <div className='d-flex mb-4'>
            <div className='w-50 m-2'>
                <h2 className='display-6'>List 1</h2>
                <ul className='list-group'>
                    {todos.map((todo, i) => (
                        <li key={i} className='list-group-item'style={{backgroundColor: 'transparent'}} >
                            {todo.editing ?
                                <input className='input form-control' value={todo.text} onChange={(e) => handleEdit(i, e)} />
                                :
                                <div style={{ float: 'left'}} >
                                    {todo.text}
                                </div>
                            }
                           <button style={{ float: 'right' }} className='btn btn-success m-2' onClick={() => handleMoveToList2(i)} >Move to list 2</button>
                            <button style={{ float: 'right' }} className='btn btn-danger m-2' onClick={() => handleDelete(i)} >Delete</button>
                            <button style={{ float: 'right' }} className='btn btn-secondary m-2' onClick={() => handleEditButtonClick(i)} >{todo.editing ? 'Save' : 'Update'}</button>
                        </li>
                    ))}
                </ul>
                <div>{todos.length? <button className='btn btn-info m-2' onClick={handleExport}>Export List 1 to Excel</button> : ''}
                
                </div>
            </div>

            <div className='w-50 m-2'>
                <h2 className='display-6'>List 2</h2>
                <ul className='list-group'>
                    {todos2.map((todo2, idx) => (
                        <li key={idx} className='list-group-item'style={{backgroundColor: 'transparent'}}  >
                            {todo2.editing2 ?
                                <input className='input form-control' value={todo2.text2} onChange={(et) => handleEdit2(idx, et)} />
                                :
                                <div style={{ float: 'left'}} >
                                    {todo2.text2}
                                </div>
                            }
                            <button style={{ float: 'right' }} className='btn btn-success m-2' onClick={() => handleMoveToList1(idx)} >Move to list 1</button>
                            <button style={{ float: 'right' }} className='btn btn-danger m-2' onClick={() => handleDelete2(idx)} >Delete</button>
                            <button style={{ float: 'right' }} className='btn btn-secondary m-2' onClick={() => handleEditButtonClick2(idx)} >{todo2.editing2 ? 'Save' : 'Update'}</button>
                        </li>
                    ))}
                </ul>
                <div>
                    {todos2.length?
                <button className='btn btn-info m-2' onClick={handleExport2}>Export List 2 to Excel</button> : ''}
                </div>
            </div>
         </div>

                 
        </div>
    )
}

export default Todo;