"use strict"

class Helper{
    constructor(time,list)
    {
        this.time=parseInt(400/time);
        this.list=list
    }
    mark=async(index)=>
    {
        this.list[index].setAttribute("class","cell current")
    }
    markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");
    }

    unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });"use strict";

class Helper {
    constructor(time, list) {
        this.delay = Math.max(50, parseInt(400 / time)); // 🔥 avoid too fast
        this.list = list;
    }

    // ================= MARK =================
    mark = async (index) => {
        this.list[index].className = "cell current";
    };

    markSpl = async (index) => {
        this.list[index].className = "cell min";
    };

    unmark = async (index) => {
        this.list[index].className = "cell";
    };

    // ================= PAUSE =================
    pause = async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, this.delay);
        });
    };

    // ================= COMPARE =================
    compare = async (i, j) => {
        await this.pause();

        let value1 = Number(this.list[i].getAttribute("value"));
        let value2 = Number(this.list[j].getAttribute("value"));

        return value1 > value2;
    };

    // ================= SWAP =================
    swap = async (i, j) => {
        await this.pause();

        let value1 = this.list[i].getAttribute("value");
        let value2 = this.list[j].getAttribute("value");

        // swap values
        this.list[i].setAttribute("value", value2);
        this.list[j].setAttribute("value", value1);

        // update height
        this.list[i].style.height = `${3.8 * value2}px`;
        this.list[j].style.height = `${3.8 * value1}px`;
    };
}
    }

    compare = async (index1, index2) => {
        await this.pause();
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        if(value1 > value2) {
            return true;
        }
        return false;
    }

    swap = async (index1, index2) => {
        await this.pause();
        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${3.8*value2}px`;
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${3.8*value1}px`;
    }
}
