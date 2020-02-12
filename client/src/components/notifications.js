import {toast} from 'react-toastify'

 const Notify = {
    notifyOne: () => {
        toast.success("Post was added", {
            autoClose: 2000,
            containerId: 'one',
        })
    },


    notifyTwo: () => {
        toast.success("Post was edited", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifyThree: () => {
        toast.error("Post was deleted", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifyFour: ()=>{
        toast.success("You are logged in", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifyFive: ()=>{
        toast.error("You are logged out", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifySix: ()=>{
        toast.success("You are registered", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifySeven: ()=>{
        toast.success("Friend was added", {
            autoClose: 2000,
            containerId: 'one',
        })
    },

    notifyEight: ()=>{
        toast.error("Friend was removed", {
            autoClose: 2000,
            containerId: 'one',
        })
    }
}

export default Notify;