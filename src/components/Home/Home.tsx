

import Footer from '../footer/Footer';
import useState from "react-usestateref"
import classes from './Home.module.css'
import Cross from '../Shapes/cross/Cross';
import { useEffect, useRef } from 'react';
import Blank from '../Shapes/blank/blank';
import Checkmark from '../Shapes/CheckMark/Checkmark';
import Circle from '../Shapes/circle/Circle';

interface SelectedItem {
  item: string;
  selected: boolean;
  isHover: boolean;
  doubleClicked: boolean
}

const Home = () => {
  const [readOnly, setReadOnly] = useState<Boolean | any>(true)
  const [todoArr, setTodoArr] = useState<SelectedItem[]>([])
  const [curTodo, setCurTodo] = useState<string>("")
  const { container, caret, foot, slash, error, listElement, footer, list, arrow, down, head, input, btn, stackTop, stackTop2, heading, card, item, todoText } = classes;
  const [curBtnClicked, setCurBtnClicked] = useState<string>("")
  const [isAllSelected, setIsAllSelected, isAllSelectedRef] = useState<boolean>(false);
  const [curDbClick, setCurDbClick] = useState<any>(undefined);
  const [filter, setFilter] = useState<string>("all");
  const inputRef = useRef(null);


  console.log(todoArr);


  const addTodo = (e: any) => {
    setCurTodo(e.target.value);
    setIsAllSelected(false)
  }

  const updateTodo = (e: any) => {
    if (e.keyCode === 13 && curTodo.length > 0) {
      setTodoArr((prevState) => [...prevState, { item: curTodo, selected: false, isHover: false, doubleClicked: false }]);
      setCurTodo("")
    }
    console.log(todoArr);

  }

  const selectAll = () => {
    setCurBtnClicked("all");
    setIsAllSelected((prevState: Boolean) => !prevState);
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem) => {
        if (isAllSelected) {
          item.selected = !isAllSelected
        } else {
          item.selected = item.selected ? true : isAllSelectedRef.current
        }
        return item;
      })
    })
  }

  const selectOne = (index: number) => {
    setCurBtnClicked("one");
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (i === index) item.selected = !item.selected;
        return item;
      })
    })
  }

  const getCheckMarkOrCircleImage = (index: number) => {
    const foundItem = todoArr.find((item: SelectedItem, i: number) => i === index);
    if (foundItem?.doubleClicked) return (<Blank />)
    if (foundItem?.selected) return (<Checkmark onClick={() => selectOne(index)} />);
    else return (<Circle onClick={() => selectOne(index)} />);
  }

  const handleHover = (index: number) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (i === index) item.isHover = true;
        return item;
      })
    })
  }

  const handleHoverLeave = (index: number) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (i === index) item.isHover = false;
        return item;
      })
    })
  }

  const handleDoubleClick = (e: any, index: number): any => {
    e.preventDefault()
    setCurDbClick(e.target);
    setReadOnly(false);
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (i === index) item.doubleClicked = true;
        return item;
      })
    })

  }

  const resetDbClick = (e: any) => {
    if (curDbClick && (e.target !== curDbClick)) {
      setTodoArr((prevState: SelectedItem[]) => {
       prevState.forEach((item: SelectedItem) => {
          item.doubleClicked = false;
        })
        return prevState.filter((item:SelectedItem) => item.item.length > 0); 
      })
    }
  }
  const editingComplete = (e: any) => {
    if(e.keyCode === 27) {
      
    }
    if (e.keyCode === 13) {
      setTodoArr((prevState: SelectedItem[]) => {
        prevState.forEach((item: SelectedItem) => {
          item.doubleClicked = false;
        })
        return prevState.filter((item:SelectedItem) => item.item.length > 0);
      })
    }
  }

  const editTodo = (e: any, item: SelectedItem, index: number) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (index === i) item.item = e.target.value;
        return item;
      })
    })
  }

  const handleFilters = (filterName: string) => {
    setFilter(filterName);
  }

  const clearCompleted = () => {
    setTodoArr((prevState: SelectedItem[]) => prevState.filter((item: SelectedItem) => !item.selected));
  }

  const removeElement = (id: number) => {
    setTodoArr((prevState: SelectedItem[]) => prevState.filter((item: SelectedItem, i: number) => i !== id));
  }

  return (
    <>
      <div onMouseDown={resetDbClick} className={container}>
        <h1 className={heading}>todos</h1>
        <div className={card}>
          <div className={item}>
            <div className={head}>
              <span onClick={selectAll} className={`${btn}`}><i className={`${arrow} ${down}`}></i><p></p></span>
              <input ref={inputRef} type="text" onKeyDown={updateTodo} value={curTodo} className={`${input}`} onChange={addTodo} placeholder={"What Needs to be done!"} />
            </div>
            {
              todoArr.length > 0 && (
                <ul className={list}>
                  {
                    todoArr.map((item: SelectedItem, index: number) => {
                      if (filter === "all") {
                        return (
                          <li key={index} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverLeave(index)} className={listElement} >
                            <>
                              {getCheckMarkOrCircleImage(index)}
                              <input unselectable='on' onMouseDown={() => false} onSelect={() => false} ref={inputRef} readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
                              {(item.isHover && !item.doubleClicked) && <Cross onClick={() => removeElement(index)} />}
                            </>
                          </li>
                        )
                      } else if (filter === "active") {
                        if (!item.selected) {
                          return (
                            <li key={index} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverLeave(index)} className={listElement} >
                              <>
                                {getCheckMarkOrCircleImage(index)}
                                <input readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
                                {(item.isHover && !item.doubleClicked) && <Cross onClick={() => removeElement(index)} />}
                              </>
                            </li>
                          )
                        }
                      } else {
                        if (item.selected) {
                          return (
                            <li key={index} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverLeave(index)} className={listElement} >
                              <>
                                {getCheckMarkOrCircleImage(index)}
                                <input ref={inputRef} readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
                                {(item.isHover && !item.doubleClicked) && <Cross onClick={() => removeElement(index)} />}
                              </>
                            </li>
                          )
                        }
                      }
                    })
                  }
                </ul>
              )
            }
            {todoArr.length > 0 && <Footer onClear={clearCompleted} onClick={handleFilters} count={todoArr.length} />}
          </div>
        </div>
        <div className={stackTop}></div>
        <div className={stackTop2}></div>
        <div className={footer}></div>
        <footer className={foot}>
          <p>Double Click to Edit!</p>
          <p>Created By <a target="_blank" rel='noreferrer' href="https://github.com/jat121">Jatin</a></p>
        </footer>
      </div>

    </>
  )
}

export default Home