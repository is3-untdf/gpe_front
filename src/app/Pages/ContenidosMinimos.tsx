import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { decrement, increment } from "../../store/slices/counter/counterSlice";
import { useEffect } from "react";

export const ContenidosMinimos = () => {
  const count = useSelector((state: RootState) => state.counter.counter)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])
  
  return (
    <div>
      Página de Contenidos Minimos
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
