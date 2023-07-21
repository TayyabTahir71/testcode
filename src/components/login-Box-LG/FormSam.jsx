import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_BOX_HANDLE, ResetFun } from '../../RTK/Reducers/Reducers';
import { ErrorText } from './ErrorText';
import { dummyLink } from './LoginBoxLGHOC';
import Images from '../../assets/images';

const FormSam = () => {
    const { hiddenPassword } = Images;

    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = React.useState({
        new: false,
        con: false
    });
    const { register, handleSubmit, formState: { errors }, watch, } = useForm();
    const { resetSuccess, resetToken, } = useSelector(store => store.mainReducer);

    const shifter = mvt => e => dispatch(LOGIN_BOX_HANDLE(mvt));
    const handleTogglePasswordVisibility = (key) => e => {
        setShowPassword(pv => ({ ...pv, [key]: !(pv[key]) }))
    };

    const newpassword = watch('newpassword');
    // const confirmpassword = watch('confirmpassword');

    const validatePasswordMatch = (value) => {
        if (value !== newpassword) {
            return 'Passwords do not match';
        }
        return true;
    };
    const handleForgotReset = (data) => {
        if (resetToken) {
            dispatch(ResetFun({
                password: data.newpassword,
                token: resetToken
            })) 
        }
    }

    return (
        <div>
            <Box component="form" id='forgotrestForm' noValidate onSubmit={handleSubmit(handleForgotReset)} sx={{ mt: 1 }}>
                <TextField
                    sx={{ mt: '20px', '& fieldset': { background: 'rgb(135, 143, 154,.08)', borderRadius: '12px', borderColor: '#EDF0F3', minHeight: '44px' }, '& label': { fontSize: '15px', top: '2px' }, '& input': { borderRadius: '12px !important', color: '#878F9A !important', padding: '11px 14px' } }}
                    margin="normal"
                    fullWidth
                    name="newpassword"
                    label="New Password"
                    type={showPassword.new ? 'text' : "password"}
                    id="newpassword"
                    disabled={resetSuccess}
                    size='small'
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Box component='img' sx={{ width: '24px', cursor: 'pointer' }} src={hiddenPassword} alt='icon' onClick={handleTogglePasswordVisibility('new')} />
                        </InputAdornment>,
                    }}
                    {...register('newpassword', { required: true, minLength: 6 })}
                    error={errors.newpassword}
                />
                {errors.newpassword && <>{errors.newpassword.type === 'minLength' ? ErrorText("Minimum Length 6 characters!") : ErrorText("Field is Required!")}</>}
                <TextField
                    sx={{ mt: '20px', '& fieldset': { background: 'rgb(135, 143, 154,.08)', borderRadius: '12px', borderColor: '#EDF0F3', minHeight: '44px' }, '& label': { fontSize: '15px', top: '2px' }, '& input': { borderRadius: '12px !important', color: '#878F9A !important', padding: '11px 14px' } }}
                    margin="normal"
                    fullWidth
                    name="confirmpassword"
                    disabled={resetSuccess}
                    label="Confirm Password"
                    type={showPassword.con ? 'text' : "password"}
                    id="confirmpassword"
                    size='small'
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Box component='img' sx={{ width: '24px', cursor: 'pointer' }} src={hiddenPassword} alt='icon' onClick={handleTogglePasswordVisibility('con')} />
                        </InputAdornment>,
                    }}
                    {...register('confirmpassword', { required: true, validate: validatePasswordMatch })}
                    error={errors.confirmpassword}
                />
                {errors.confirmpassword && <span>{errors.confirmpassword.type === 'validate' && ErrorText('Passwords do not match')}</span>}
                <Box mt='50px'>
                    <Button disabled={resetSuccess} mt={'42px'} type="submit" size='smal' variant='contained'
                        sx={{ textTransform: 'capitalize', borderRadius: '12px', backgroundColor: '#8077F6', fontSize: '11px', padding: '9px 26px' }} disableElevation
                    >{!resetToken ? 'Request Reset' : 'Reset Now'}</Button>
                </Box>
                <Box mt='50px'>
                    <Box sx={{ fontSize: '12px', color: '#5D6974' }}>
                        Already have an Account?
                        <span onClick={shifter('login')} style={dummyLink}>
                            {" Login"}
                        </span>
                    </Box>
                    <Box mt={2} sx={{ fontSize: '12px', color: '#5D6974' }}>
                        Don't have an account?
                        <span onClick={shifter('signup')} style={dummyLink}>
                            {" Sign Up"}
                        </span>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default FormSam