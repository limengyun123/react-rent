import React from 'react'
import {Link} from 'react-router-dom'
import {Button,Result } from  'antd'

const NotLogin=()=>{

	return (
		<Result
			status="warning"
			title="您未登录，请先登录."
			extra={
				<div>
					<Button type="primary">
						<Link to='/login/loginIn'>去登录</Link>
					</Button>
				</div>
			}
		/>
	)
}


export default NotLogin