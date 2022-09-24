import { atom } from "jotai";

import { User } from "@api/users";

interface UserState {
  user: User | null;
  loading: boolean;
}

const userAtom = atom<UserState>({
  user: null,
  loading: true,
});

export { userAtom };
