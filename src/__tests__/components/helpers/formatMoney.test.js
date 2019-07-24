import React from 'react';
import { formatMoney } from '../../../components/helpers/formatMoney';

it('returns N/A if not enough data', () => {
    expect(formatMoney('not enough data')).toEqual('N/A')
});

it('returns formatted money', () => {
    expect(formatMoney(0)).toEqual('$0.00')
});

it('formats negative money', () => {
    expect(formatMoney(-5)).toEqual('-$5.00')    
})

it('formats many decimals', () => {
    expect(formatMoney(5.3333333)).toEqual('$5.33')    
})

it('formats thousands', () => {
    expect(formatMoney(50000)).toEqual('$50,000.00')    
})

it('removes whitespace', () => {
    expect(formatMoney('50000')).toEqual('$50,000.00')    
})