import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const userAtom = atom({
  user: null,
  loading: true,
});

const getUser = atom((get) => {
  if (get(userAtom).isLogged) {
    return get(userAtom);
  }
  return false;
});

const setUserAtom = atom(null, (get, set, _arg) => set(userAtom({ _arg })));

const jwtAtom = atomWithStorage("JWT", null);

const getJwt = atom((get) => {
  if (get(jwtAtom)) {
    return get(jwtAtom);
  }
  return false;
});

const setJwt = atom(null, (get, set, _arg) => set(jwtAtom, _arg));

export { userAtom, jwtAtom, getUser, setUserAtom, getJwt, setJwt };
