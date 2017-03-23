import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryInvestmentsDataService implements InMemoryDbService {
  createDb() {
    let investments = [
            {
                id:1,
                investerId: 'zia1',
                investmentId: 'investment-pf1',
                name: 'fixed deposit',
                lockInPeriod : 0,
                transactions: [
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:1234, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:1234, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            },
            {
                id:2,
                investerId : 'zia3',
                investmentId : 'investment-mf',
                name: 'Mutual Fund',
                lockInPeriod : 0,
                transactions:[
                    { transactionDate:'2017-01-18T18:25:43.511Z', amountInvested:2500, rateOfReturn:0, maturityDate:'2017-04-23T18:25:43.511Z', amountAtMaturity:0, returns:0,charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly', folioNumber:'3921425/79', scode:104772,unitPrice:37.4920,fundName:'DSP BlackRock Tax Saver Fund - Regular Plan - Growth' },
                    { transactionDate:'2016-01-17T18:25:43.511Z', folioNumber:'3921426/79', scode:112090, fundName:'Kotak Select Focus Fund - Growth', amountInvested:2500, unitPrice:25.9320, rateOfReturn:0, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-02-06T18:25:43.511Z', folioNumber:'3921427/79', scode:104772, fundName:'DSP BlackRock Tax Saver Fund - Regular Plan - Growth', amountInvested:2500, unitPrice:39.5440, rateOfReturn:0, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-02-06T18:25:43.511Z', folioNumber:'3921428/79', scode:112090, fundName:'Kotak Select Focus Fund - Growth', amountInvested:2500, unitPrice:27.5920, rateOfReturn:0, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-03-07T18:25:43.511Z', folioNumber:'3921430/79', scode:104772, fundName:'DSP BlackRock Tax Saver Fund - Regular Plan - Growth', amountInvested:2500, unitPrice:39.3830, rateOfReturn:0, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-03-07T18:25:43.511Z', folioNumber:'3921429/79', scode:112090, fundName:'Kotak Select Focus Fund - Growth', amountInvested:2500, unitPrice:27.8570, rateOfReturn:0, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},

                ]
            },
            {
                id:3,
                investerId : 'zia3',
                investmentId : 'investment-fd',
                name: 'Fixed Deposit',
                lockInPeriod : 0,
                transactions:[
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:2500, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z', amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years', calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:2500, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years', calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:2500, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:3400, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:2500, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:1234, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:1234, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:1234, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            },
            {
                id:4,
                investerId : 'zia4',
                investmentId : 'investment-ppf',
                name: 'Public Providend Fund',
                lockInPeriod : 15,
                transactions:[
                    { transactionDate:'2015-03-30T18:25:43.511Z', amountInvested:1000, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2015-04-01T18:25:43.511Z', amountInvested:50000, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2015-05-05T18:25:43.511Z', amountInvested:100000, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-06-07T18:25:43.511Z', amountInvested:125000, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-06-08T18:25:43.511Z', amountInvested:25000, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            },
            {
                id:5,
                investerId : 'zia5',
                investmentId : 'investment-pf5',
                name: 'fixed deposit5',
                lockInPeriod : 0,
                transactions:[
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:1234, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:1234, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            },
            {
                id:6,
                investerId : 'zia6',
                investmentId : 'investment-pf6',
                name: 'fixed deposit6',
                lockInPeriod : 0,
                transactions:[
                    { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:'10000', rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:'12000', rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:'15000', rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:'10000', rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            },
            {
                id:7,
                investerId : 'zia7',
                investmentId : 'investment-pf7',
                name: 'fixed deposit7',
                lockInPeriod : 0,
                transactions:[
                   { transactionDate:'2016-04-23T18:25:43.511Z', amountInvested:1234, rateOfReturn:8, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-25T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.5, maturityDate:'2017-04-01T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-26T18:25:43.511Z', amountInvested:1234, rateOfReturn:8.3, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'},
                    { transactionDate:'2016-04-27T18:25:43.511Z', amountInvested:1234, rateOfReturn:7.1, maturityDate:'2017-04-23T18:25:43.511Z',amountAtMaturity:0, returns:0, charges:10, rateFrequency:'Years',calculationFrequency:'Quaterly'}
                ]
            }
        ];
        return {investments};
  }
}
