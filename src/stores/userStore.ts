import { makeAutoObservable, observable, action } from "mobx";
import { IUser, IUserFirebase } from "../interfaces/IUser";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { registerUser, getCoins, getUser } from "../services/authService";
const firebaseConfig = {
  apiKey: "AIzaSyB5k3ues-VyvT8rxUwuWHyFwospSFIKgCc",
  authDomain: "geografiskhave-wuo2.firebaseapp.com",
  projectId: "geografiskhave-wuo2",
  storageBucket: "geografiskhave-wuo2.appspot.com",
  messagingSenderId: "502243111873",
  appId: "1:502243111873:web:90e1132fec6d2be4dc3540",
};

initializeApp(firebaseConfig);
const auth = getAuth();

export class AuthStore {
  @observable user: IUser | null = null;
  @observable userFirebase: User | null = null;
  @observable coins: number = 0;

  @action setUser(user: IUser | null) {
    this.user = user;
  }

  @action setUserFirebase(user: User | null) {
    this.userFirebase = user;
  }

  @action setCoins(coins: number) {
    this.coins = coins;
  }

  @action async registerUser(user: IUserFirebase) {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    await updateProfile(auth.currentUser!, { displayName: user.name }).then(
      async () => {
        await registerUser({ id: auth.currentUser!.uid }).then(async () => {
          const user = await getUser(auth.currentUser!.uid);
          this.setUserFirebase(auth.currentUser);
          this.setUser(user);
        });
      },
    );
  }

  @action async loginUser(user: IUserFirebase) {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      async () => {
        this.setUserFirebase(auth.currentUser);
        this.setUser(await getUser(auth.currentUser!.uid));
        this.getCoins(auth.currentUser!.uid);
        console.log(this.user);
      },
    );
  }

  @action async signOut() {
    await auth.signOut().then(() => {
      this.setUser(null);
      this.setUserFirebase(null);
    });
  }

  @action async getCoins(id: string) {
    await getCoins(id).then((points) => {
      this.setCoins(points);
    });
  }

  @action async getUser(id: string) {
    await getUser(id).then((user) => {
      this.setUser(user);
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}
