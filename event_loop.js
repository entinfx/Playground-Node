/* The Event Loop */
// * While the stack is not empty:
//     * If a task is sync - execute it on the main thread
//     * If a task is async - let WebAPI (browser) or C++ libs (Node) handle it
//       on a separate thread sequentially in a separate event queue.
// * When the async task is finished:
//     * If it's a microtask (promise) - put the callback in the end of the
//       currently running loop.
//     * If it's a macrotask (setTimeout(), setInterval()) - put the callback in
//       the beginning of the next loop.

/* Execution order */
console.log('1 Sync') // executes instantly
setTimeout(_ => console.log('2 Timeout'), 0) // queued for next loop
Promise.resolve().then(_ => console.log('3 Promise')) // queued before next loop
console.log('4 Sync') // executes instantly
// Order: 1, 4, 3, 2
// The 1 and 4 sync commands get executed one after the other in the first run.
// 2 async callbacks get queued up for execution in the next loop, however
// the promise gets executed before the timeout because the former is a
// microtask and gets executed before the start of the next loop.

/* Run code off the main thread with a Promise */
const tick = Date.now()
const log = msg => console.log(`${Date.now() - tick}ms: ${msg}`)

function heavyCPUTask() {
    // Wrapping the task inside a normal promise will still run it on the main
    // thread. Wrap the task inside the resolved promise instead to make sure it
    // runs after the sync tasks are done
    return Promise.resolve().then(_ => {
        let i = 0
        while (i < 1000000000) i++
        return 'Billion loops finished.'
    })
}

log('Sync 1') // executes first
heavyCPUTask().then(msg => log(msg)) // gets queued, executes last
log('Sync 2') // executes second