import { io } from 'socket.io-client';

const socket = io("https://dotlabs.onrender.com/");
export let applications: any = [];

export function socketGet() {
    socket.on("connect", () => {
        console.log('connected')
        socket.emit("getApplications", {});
        socket.on("get", (data) => {
            applications = data;
        });
    });
}