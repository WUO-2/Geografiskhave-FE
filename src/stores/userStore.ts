import { makeAutoObservable, observable, action } from "mobx";
import { IUser, IUserFirebase } from "../interfaces/IUser";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { LatLngLiteral } from "leaflet";
import { initializeApp } from "firebase/app";
import { registerUser, getCoins, getUser, getAvatars, updateAvatar } from "../services/authService";
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
  @observable position: LatLngLiteral | null = null;
  @observable avatars: any[] = [];

  @action setPosition(position: LatLngLiteral) {
    console.log(position);
    this.position = position;
  }

  @action setUser(user: IUser | null) {
    this.user = user;
  }

  @action setUserFirebase(user: User | null) {
    this.userFirebase = user;
  }

  @action setAvatars(avatars: any[]) {
    this.avatars = avatars;
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
      }
    );
  }

  @action async loginUser(user: IUserFirebase) {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      async () => {
        this.setUserFirebase(auth.currentUser);
        this.setUser(await getUser(auth.currentUser!.uid));
        console.log(this.user);
      }
    );
  }

  @action async signOut() {
    await auth.signOut().then(() => {
      this.setUser(null);
      this.setUserFirebase(null);
    });
  }

  @action async getUser(id: string) {
    await getUser(id).then((user) => {
      this.setUser(user);
    });
  }

  @action async getAvatars() {
    await getAvatars().then((avatars) => {
      this.setAvatars(avatars);
    });
  }

  @action async updateUser(avatar: any) {
    console.log(avatar);
    await updateAvatar(this.user!.id, avatar.imageURL).then(() => {
      this.getUser(this.user!.id);
    });
    
  }
  constructor() {
    makeAutoObservable(this);
  }
}
