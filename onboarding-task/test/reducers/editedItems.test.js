import * as Immutable from 'immutable';
import Item from '../../src/models/Item';
import EditedItem from '../../src/models/EditedItem';
import reducersTests from './reducersTests';
import editedItemsReducer from '../../src/reducers/editedItems';
import updateItemDescription from '../../src/actions/updateItemDescription';
import updateItemIsEdited from '../../src/actions/updateItemIsEdited';
import updateAllItemsDescription from '../../src/actions/updateAllItemsDescription';
import storeEditedItemDescription from '../../src/actions/storeEditedItemDescription';
import deleteItem from '../../src/actions/deleteItem';

describe('editedItems', reducersTests(editedItemsReducer, () => {
  it('update isEdited=true action adds new item to state if not present', () => {
    const action = updateItemIsEdited('uuiduuiduuiduuiduuid', true);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toBeImmutableMap();
    expect(actualState.count()).toBe(1);
  });

  it('update isEdited=true action sets flag of item if present', () => {
    const itemId = 'test GUID description';
    const editedItem = new EditedItem({ isEdited: false });
    const expectedEditedItem = editedItem.set('isEdited', true);
    const action = updateItemIsEdited(itemId, true);
    const currentState = new Immutable
      .Map()
      .set(itemId, editedItem);

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable
      .Map()
      .set(itemId, expectedEditedItem));
  });

  it('update isEdited=false action sets flag of item if present', () => {
    const itemId = 'baubaubauba';
    const editedItem = new EditedItem({ isEdited: true });
    const expectedEditedItem = editedItem.set('isEdited', false);
    const action = updateItemIsEdited(itemId, false);
    const currentState = new Immutable
      .Map()
      .set(itemId, editedItem);

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable
      .Map()
      .set(itemId, expectedEditedItem));
  });

  it('update isEdited=false action does not change state if item not present', () => {
    const action = updateItemIsEdited('hugaGuidhugaGuid', false);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('update description action removes item from state if present', () => {
    const itemId = 'testGuid';
    const action = updateItemDescription(itemId, 'what ever description');
    const currentState = new Immutable
      .Map()
      .set(itemId, new EditedItem());

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('delete item action removes edited item as well', () => {
    const itemId = 'GuiDGuidGuidGuid';
    const action = deleteItem(itemId);
    const currentState = new Immutable
      .Map()
      .set(itemId, new EditedItem());

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('update all description reset isEdited for affected items', () => {
    const itemId1 = 'asdasdasdas';
    const itemId2 = 'qweqwewqeqw';
    const itemId3 = 'zxcxzczczcz';
    const editedItem1 = new EditedItem({ description: 'new', isEdited: true, isOriginal: false });
    const editedItem2 = new EditedItem({ description: 'newer', isEdited: true, isOriginal: false });
    const expectedItem1 = editedItem1.set('isEdited', false);
    const expectedItem2 = editedItem2.set('isEdited', false);
    const expectedItem3 = new EditedItem({ description: 'newest', isEdited: true });
    const action = updateAllItemsDescription(new Immutable
      .Map()
      .set(itemId1, editedItem1)
      .set(itemId2, editedItem2));
    const currentState = new Immutable
      .Map()
      .set(itemId1, editedItem1)
      .set(itemId2, editedItem2)
      .set(itemId3, expectedItem3);
    const expectedState = new Immutable
      .Map()
      .set(itemId1, expectedItem1)
      .set(itemId2, expectedItem2)
      .set(itemId3, expectedItem3);

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(expectedState);
  });

  it('store edited description action modifies description for existing item', () => {
    const itemId = 'aGuidIdToBeHereForSureSomeday';
    const currentState = new Immutable
      .Map()
      .set(itemId, new EditedItem({ description: 'original description', isOriginal: true }));
    const expectedItem = new EditedItem({ description: 'new description', isOriginal: false });

    const action = storeEditedItemDescription(itemId, expectedItem.description);
    const actualState = editedItemsReducer(currentState, action);

    expect(actualState)
      .toEqualImmutable(new Immutable
        .Map()
        .set(itemId, expectedItem));
  });

  it('store edited description action modified state for non-existing item', () => {
    const itemId = 'aGuidIdToBeHereForSure';
    const expectedItem = new EditedItem({ description: 'newer description', isOriginal: true });
    const currentState = new Immutable.Map();

    const action = storeEditedItemDescription(itemId, expectedItem.description, true);
    const actualState = editedItemsReducer(currentState, action);

    expect(actualState)
      .toEqualImmutable(new Immutable
        .Map()
        .set(itemId, expectedItem));
  });
}));

