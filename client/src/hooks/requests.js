const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
    // TODO:Once API is ready.
    // Load planets and return as JSON.
    const response = await fetch(`${API_URL}/planets`)
    return await response.json()
}

async function httpGetLaunches() {
    // TODO: Once API is ready.
    // Load launches, sort by flight number, and return as JSON.
    const response = await fetch(`${API_URL}/launches`)
    const fetchedLaunches = await response.json()
    return fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber
    })
}

async function httpSubmitLaunch(launch) {
    // TODO: Once API is ready.
    // Submit given launch data to launch system.
    // fetch的第二个参数可以设置method
    // 防止报错的设置
    console.log("ddd")
    try {
        return await fetch(`${API_URL}/launches`, {
            method: 'post',
            headers: {
                // 妈了个逼的我这里设成accept 调错了好久 我真日你妈
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(launch),
        })
    } catch (error) {
        return {
            ok: false,
            //     ok 默认是true
        }
    }

}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
    try {
        return await fetch(`${API_URL}/launches/${id}`, {
            method: 'delete',

    }
        )
    }catch (error) {
        return {
            ok: false,
        }
    }

}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};