export const promotionReducer = (state, action) => {
    switch (action.type) {
        case 'ADDALL':
            return action.payload
        case 'CREATE':
            return [
            ...state,
            action.payload,
            ];
        case 'DELETE':
            return state.filter(promotion => promotion.id !== action.payload.id);
        case 'EDIT':
            return state.map(promotion => promotion.id===action.payload.id? action.payload.promotion: promotion)
        default:
            return state;
        }
  };
  