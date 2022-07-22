

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
  const { container, caret, slash, error, listElement, footer, list, arrow, down, head, input, btn, stackTop, stackTop2, heading, card, item, todoText } = classes;
  const [curBtnClicked, setCurBtnClicked] = useState<string>("")
  const [isAllSelected, setIsAllSelected, isAllSelectedRef] = useState<boolean>(false);
  const [curDbClick, setCurDbClick] = useState<any>(undefined);
  const [filter, setFilter] = useState<string>("all");
  const [sameValue, setSameValue, sameValueRef] = useState<boolean>(false);
  const inputRef = useRef(null);


  useEffect(() => {
    console.log(inputRef);
  }, [])

  const addTodo = (e: any) => {
    setCurTodo(e.target.value);
    setSameValue(false)
    setIsAllSelected(false)
  }

  const updateTodo = (e: any) => {
    debugger

    if (e.keyCode === 13) {
      let isSame = false;
      todoArr.forEach((item: any) => {
        if (item.item === curTodo) {
          isSame = true;
        }
      })
      if (isSame) {
        setSameValue(true);
        setCurTodo("")
        return;
      }
      setSameValue(false);
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

  const selectOne = (itemTodo: string) => {
    setCurBtnClicked("one");
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem) => {
        if (item.item === itemTodo) item.selected = !item.selected;
        return item;
      })
    })
  }

  const getCheckMarkOrCircleImage = (item: SelectedItem) => {
    const foundItem = todoArr.find((i: SelectedItem) => i.item === item.item);
    if (foundItem?.doubleClicked) return (<Blank />)
    if (foundItem?.selected) return (<Checkmark onClick={() => selectOne(item.item)} />);
    else return (<Circle onClick={() => selectOne(item.item)} />);
  }

  const handleHover = (itemHover: SelectedItem) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem) => {
        if (item.item === itemHover.item) item.isHover = true;
        return item;
      })
    })
  }

  const handleHoverLeave = (itemHover: SelectedItem) => {
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem) => {
        if (item.item === itemHover.item) item.isHover = false;
        return item;
      })
    })
  }

  const handleDoubleClick = (e: any, itemDbClicked: SelectedItem): any => {
    e.preventDefault()
    setCurDbClick(e.target);
    setReadOnly(false);
    // e.currentTarget.style.width = "100%";
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.map((item: SelectedItem) => {
        if (item.item === itemDbClicked.item) item.doubleClicked = true;
        return item;
      })
    })

  }

  const resetDbClick = (e: any) => {
    if (curDbClick && (e.target !== curDbClick)) {
      setTodoArr((prevState: SelectedItem[]) => {
        return prevState.map((item: SelectedItem) => {
          item.doubleClicked = false;
          return item;
        })
      })
    }
  }
  const editingComplete = (e: any) => {
    if (e.keyCode === 13) {
      setTodoArr((prevState: SelectedItem[]) => {
        return prevState.map((item: SelectedItem) => {
          item.doubleClicked = false;
          return item;
        })
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
    setTodoArr((prevState: SelectedItem[]) => {
      return prevState.filter((item: SelectedItem, i: number) => i !== id);
    })
  }


  return (
    <>
      <div onMouseDown={resetDbClick} className={container}>
        <h1 className={heading}>todos</h1>

        <div className={card}>

          <div className={item}>
            <div className={head}>
              <span onClick={selectAll} className={`${btn}`}><i className={`${arrow} ${down}`}></i><p></p></span>
              <input ref={inputRef} type="text" onKeyDown={updateTodo} value={curTodo} className={`${input} ${sameValue ? error : ""}`} onChange={addTodo} placeholder={!sameValue ? "What Needs to be done!" : "HEY! This Todo Already Exists!"} />
            </div>

            {
              todoArr.length > 0 && (
                <ul className={list}>
                  {
                    todoArr.map((item: SelectedItem, index: number) => {
                      if (filter === "all") {
                        return (
                          <li key={index} onMouseEnter={() => handleHover(item)} onMouseLeave={() => handleHoverLeave(item)} className={listElement} >
                            <>
                              {getCheckMarkOrCircleImage(item)}
                              <input unselectable='on' onMouseDown={() => false} onSelect={() => false} ref={inputRef} readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, item)}></input>
                              {(item.isHover && !item.doubleClicked) && <Cross onClick={() => removeElement(index)} />}
                            </>
                          </li>
                        )
                      } else if (filter === "active") {
                        if (!item.selected) {
                          return (
                            <li key={index} onMouseEnter={() => handleHover(item)} onMouseLeave={() => handleHoverLeave(item)} className={listElement} >
                              <>
                                {getCheckMarkOrCircleImage(item)}
                                <input readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, item)}></input>
                                {(item.isHover && !item.doubleClicked) && <Cross onClick={() => removeElement(index)} />}
                              </>
                            </li>
                          )
                        }
                      } else {
                        if (item.selected) {
                          return (
                            <li key={index} onMouseEnter={() => handleHover(item)} onMouseLeave={() => handleHoverLeave(item)} className={listElement} >
                              <>
                                {getCheckMarkOrCircleImage(item)}
                                <input ref={inputRef} readOnly={readOnly} onKeyDown={editingComplete} value={item.item} onChange={(e) => { editTodo(e, item, index) }} className={`${todoText} ${item.selected && slash} ${item.doubleClicked && caret}`} onDoubleClick={($event: any) => handleDoubleClick($event, item)}></input>
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
            <Footer onClear={clearCompleted} onClick={handleFilters} count={todoArr.length} />
          </div>
        </div>
        <div className={stackTop}></div>
        <div className={stackTop2}></div>
        <div className={footer}></div>
      </div>
    </>
  )
}

export default Home