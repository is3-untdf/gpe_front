import { useEffect } from "react";
import { getPokemons } from "../../store/slices/pokemon/thunks";
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

export const Play = () => {
  const dispatch = useDispatch<AppDispatch>(); // Aquí lo tipamos correctamente
  const {
    isLoading,
    pokemons = [],
    page,
  } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    // dispatch(getPokemons());
    console.log("ade")
  }, []);

  return (
    <div>
      <h2>Página de Play</h2>
      <hr />
      <span>{isLoading ? "Cargando" : "Listo"}</span>
      <ul>
        {pokemons.map((x) => (
          <li key={x.id}>{x.descripcion}</li>
        ))}
      </ul>
      <button
        disabled={isLoading}
        onClick={() => dispatch(getPokemons())}
      ></button>
      <h3>{page}</h3>
    </div>
  );
};

//  *********** COUNTER *************
// import { useDispatch, useSelector } from "react-redux"
// import type { RootState } from "../../store/store"
// import { increment, incrementBy } from "../../store/slices/counter/counterSlice"

// export const Play = () => {
//   const count = useSelector((state: RootState) => state.counter.counter)
//   const dispatch = useDispatch()

//   return (
//     <div>
//       <h2>Página de Play</h2>

//       <div>
//         <h2>{count}</h2>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(incrementBy(3))}
//         >
//           Increment By
//         </button>

//       </div>
//     </div>
//   )
// }
