import Footer from '../footer/Footer';
import useState from "react-usestateref";
import classes from './Home.module.css';
import Cross from '../Shapes/cross/Cross';
import { useRef } from 'react';
import Blank from '../Shapes/blank/blank';
import Checkmark from '../Shapes/CheckMark/Checkmark';
import Circle from '../Shapes/circle/Circle';

interface SelectedItem {
  item: string;
  selected: boolean;
  isHover: boolean;
  doubleClicked: boolean
}
const { container, caret, foot, slash, listElement, footer, list, arrow, down, head, input, btn, heading, card, item, todoText } = classes;

const Home = () => {
  const [readOnly, setReadOnly] = useState<Boolean | any>(true);
  const [todoArr, setTodoArr] = useState<SelectedItem[]>([]);
  const [curTodo, setCurTodo] = useState<string>("");
  const [isAllSelected, setIsAllSelected, isAllSelectedRef] = useState<boolean>(false);
  const [curDbClick, setCurDbClick] = useState<any>(undefined);
  const [filter, setFilter] = useState<string>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevVal, setPrevValue] = useState<{ item: string, id: number }>({ item: "", id: -1 });
  const inputRef = useRef(null);
  const secondRef: any = useRef(null);

  const addTodo = (e: any) => {
    setCurTodo(e.target.value);
    setIsAllSelected(false);
  }

  const selectAll = () => {
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
    setCurDbClick(e.target);
    setReadOnly(false);
    setIsEditing(true)
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {
        if (i === index) {
          setPrevValue({ item: item.item, id: index })
          item.doubleClicked = true;
        }
        return item;
      })
    })
  }

  const resetDbClick = (e: any) => {
    if (curDbClick && (e.target !== curDbClick)) {
    setIsEditing(false)
      setTodoArr((prevState: SelectedItem[]) => {
        prevState.forEach((item: SelectedItem) => {
          item.doubleClicked = false;
        })
        return prevState.filter((item: SelectedItem) => item.item.length > 0);
      })
    }
  }


  const editTodo = (e: any, index: number) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem, i: number) => {

        if (index === i) {
          item.item = e.target.value
        }
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

  const doSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      if (curTodo.length > 0) {
        setTodoArr((prevState) => [...prevState, { item: curTodo, selected: false, isHover: false, doubleClicked: false }]);
        setCurTodo("")
      }
    }

    if (secondRef.current) {
      if (secondRef.current.value) {
        setIsEditing(false)
        setTodoArr((prevState: SelectedItem[]) => {
          prevState.forEach((item: SelectedItem) => {
            item.doubleClicked = false;
          })
          return prevState.filter((item: SelectedItem) => item.item.length > 0);
        })
      }
    }
  }

  const escape = (e: any) => {
    debugger
    if (isEditing) {
      if (e.keyCode === 27) {
        setIsEditing(false)
        setTodoArr((prevState: SelectedItem[]) => {
          return prevState.map((item: SelectedItem, i: number) => {
            if (i === prevVal.id) {
              item.item = prevVal.item;
              item.doubleClicked = false;
            }
            return item;
          })
        })
      }
    }
  }

  return (
    <>
      <form onKeyDown={escape} onSubmit={doSubmit} onMouseDown={resetDbClick} className={container}>
        <h1 className={heading}>Add Tasks</h1>
        <div className={card}>
          <div className={item}>
            <div className={head}>
              <span onClick={selectAll} className={`${btn}`}><i className={`${arrow} ${down}`}></i><p></p></span>
              <input autoFocus ref={inputRef} name="main" type="text" value={curTodo} className={`${input}`} onChange={addTodo} placeholder={"What Needs to be done!"} />
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
                              <input ref={secondRef} readOnly={readOnly} value={item.item} onChange={(e) => { editTodo(e, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
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
                                <input readOnly={readOnly} ref={secondRef} value={item.item} onChange={(e) => { editTodo(e, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
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
                                <input ref={secondRef} readOnly={readOnly} value={item.item} onChange={(e) => { editTodo(e, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, index)}></input>
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
            {todoArr.length > 0 && <Footer todoList={todoArr} onClear={clearCompleted} onClick={handleFilters} count={todoArr.length} />}
          </div>
        </div>
        <div className={footer}></div>
        <footer className={foot}>
          <p>Double Click to Edit!</p>
          <p>Created By Ishika Baid</p>
        </footer>
      </form>
    </>
  )
}

export default Home;