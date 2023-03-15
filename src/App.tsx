import classes from './app.module.css'
import Avator from './components/Avator'
import Comments from './components/Comments/Comments'

function App() {

  return (
    <div className={classes.root}>
      <div className='h-[500px] overflow-auto mb-40'><Comments /></div>
      <div className='fixed bottom-5 bg-white w-full max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-3xl gap-5 shadow-sm py-4 px-3 rounded-lg flex items-start justify-center font-rubik'>
        {/* Avator */}
        <div>
          <Avator />
        </div>

        {/* Message Box */}

        <textarea id="message" rows={5} className="w-full outline-none p-2 box-content rounded-lg shadow-sm border border-veryLightGray text-sm focus:bg-veryLightGray text-grayishBlue" placeholder="Write your comment here..."></textarea>


        {/* Send Button */}
        <button className='bg-moderateBlue w-24 rounded-lg py-2 text-white'>Send</button>

      </div>
    </div>
  )
}

export default App
