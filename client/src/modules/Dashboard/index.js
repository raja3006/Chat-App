import Avatar from '../../assets/avatar.svg'
import Input from '../../components/Input'

const Dashboard = () => {
    const contacts = [
        {
            name : 'Amrit',
            status : 'Available',
            img : Avatar
        },
        {
            name : 'Pandey',
            status : 'Available',
            img : Avatar
        },
        {
            name : 'Vivek',
            status : 'Available',
            img : Avatar
        },
        {
            name : 'Koustubh',
            status : 'Available',
            img : Avatar
        },
        {
            name : 'Prerna',
            status : 'Available',
            img : Avatar
        },
        {
            name : 'Ashu',
            status : 'Available',
            img : Avatar
        },
    ]
  return (
    <div className='w-screen flex'>
        <div className='w-[25%] h-screen bg-secondary'>
            <div className='flex items-center my-8 mx-14'>
                <div className='border border-primary p-[2px] rounded-full'><img src = {Avatar} alt='Default iamge' width={75} height={75} /></div>
                <div className='ml-8'>
                    <h3 className='text-2xl'>Talkify</h3>
                    <p className='text-lg font-light'>My Acccount</p>
                </div>
            </div>
            <hr/>
            <div className='mx-14 mt-10'>
                <div className='text-primary text-lg'>Messages</div>
                <div>
                    {
                        contacts.map(({ name , status , img}) => {
                            return (
                                <div className='flex items-center py-8 border-b border-b-gray-300'>
                                    <div className='flex cursor-pointer items-center'>
                                        <div><img src = {img} alt='Default iamge' width={60} height={60} /></div>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold'>{name}</h3>
                                            <p className='text-sm font-light text-gray-600'>{status}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
            <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
                <div className='cursor-pointer'><img src = {Avatar} alt='Default iamge' width={60} height={60} /></div>
                <div className='ml-6 mr-auto'>
                    <h3 className='text-lg'>Amrit</h3>
                    <p className='text-sm font-light text-gray-600'>Online</p>
                </div>
                <div className='cursor-pointer'>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="black"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 9l5 -5" /><path d="M16 4l4 0l0 4" /></svg>
                </div>
            </div>
            <div className='h-[75%] w-full overflow-auto shadow-md'> {/*isse chat ke neeche ka khatam ho jaiga agr max-h-100vh kardiya*/}
                <div className='p-14'>
                    <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                    <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typecasting industry
                    </div>
                </div>
            </div>
            <div className='w-full p-14 flex items-center'>
                <Input placeholder='Type ypu message...' className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outlin-none'/>
                <div className='ml-4 p-2 cursor-pinter bg-light rounded-full'>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                </div>
                <div className='ml-4 p-2 cursor-pinter bg-light rounded-full'>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                </div>
            </div>
        </div>
        <div className='w-[25%] h-screen bg-light'></div>
    </div>
  )
}

export default Dashboard
