import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IconContext } from "react-icons";
import PropTypes from "prop-types";
import { SearchbarHeader, Form, SearchFormButton, ButtonLabel, Input } from './Searchbar.styled';


export const Searchbar = ({querry: prevQuerry, onSubmit}) => {

    const [newQuerry, setNewQuerry] = useState('');

    const handleChange = (e) => {     
        setNewQuerry(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const querry = newQuerry.trim().toLowerCase();       
        
        if (querry === '') {

            toast('Please, enter some querry')
            
            e.currentTarget.searchQuerry.value = ''
            return
        }

        if (querry === prevQuerry) {

            toast('Please, try different querry')
            
            return
        }
                
        onSubmit(querry)        
    }
    
    return (
        <SearchbarHeader>
            <Form onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                    <IconContext.Provider
                        value={{
                                size: '100%',
                                style: { verticalAlign: 'middle' }
                            }}>
                        <AiOutlineSearch />
                    </IconContext.Provider>
                </SearchFormButton>
                <Input
                        type="text"
                        name="searchQuerry"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange} />                    
            </Form>                       
        </SearchbarHeader>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    querry: PropTypes.string.isRequired,
}